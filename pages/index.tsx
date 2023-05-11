import { gql, useQuery } from '@apollo/client';
import type { GetStaticProps, NextPage } from 'next';
import HomePageHead from '../components/head/homePageHead';
import { initializeApollo } from '../lib/apolloClient';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import LaunchCard from '../components/LaunchCard';
import LaunchModal from '../components/LaunchModal'; // Corrigé "LaunchModel" en "LaunchModal"
import SearchBar from '../components/SearchBar';

const EXEMPLE_QUERY = gql`
  query GetLaunches {
    launchesPast(limit: 12) {
      id
      mission_name
      launch_date_local
      launch_success
      rocket {
        rocket_name
      }
      launch_site {
        site_name
      }
      details
      links {
        flickr_images
        mission_patch
      }
    }
  }
`;

interface Launch {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_success: boolean;
  rocket: {
    rocket_name: string;
  };
  launch_site: {
    site_name: string;
  };
  details: string;
  links: {
    flickr_images: string[];
  };
}

interface LaunchesData {
  launchesPast: Launch}

const Home: NextPage = () => {
  const { loading, error, data } = useQuery<LaunchesData>(EXEMPLE_QUERY);
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLaunchClick = (launch: Launch) => {
    setSelectedLaunch(launch);
  };
  const handleCloseModal = () => {
    setSelectedLaunch(null);
  };

  if (error || !data) return <>{"An error occurred fetching data"}</>; // Corrigé "occured" en "occurred"
  if (loading) return <>{"Loading"}</>;

  const launches = data?.launchesPast;
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getFilteredLaunches = () => {
    if (!launches) {
      return [];
    }

    if (!searchQuery) {
      return launches;
    }

    return launches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredLaunches = getFilteredLaunches();

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px' }}>
      <HomePageHead />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'

        }}
      >
        <h1 style={{ textAlign: 'center' }}>SpaceX Launches Gallery</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {filteredLaunches.map((launch: any) => (
          <LaunchCard key={launch.id} launch={launch} onClick={handleLaunchClick} />
        ))}
        {selectedLaunch && (
          <LaunchModal launch={selectedLaunch} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: EXEMPLE_QUERY });
  return {
    props: {},
  };
};

export default Home;