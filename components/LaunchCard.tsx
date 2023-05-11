import React from 'react';

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
        flickr_images: string[]
    };
};

type LaunchCardProps = {
    launch: Launch;
    onClick: (launch: Launch) => void;
};

const LaunchCard: React.FC<LaunchCardProps> = ({launch, onClick}) => {
    const handleClick = () => {
        onClick(launch);
    };

    return (
        <div onClick={handleClick}
            style={{
                width: 'calc(25% - 20px)',
                marginBottom: '20px',
                backgroundColor: '#F1F1F1',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
            }}
        >
            <img 
                src={launch.links.flickr_images[0]}
                style = {{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "30px"
                }}
            />
            <div
                style = {{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignSelf: 'center',
                    marginBottom: '0px'
                }}>
                    <p style={{fontSize: "10px", paddingLeft: '10%'}}>{(launch.launch_date_local.split('T')[0]).replace(/-/g, "/")}</p>
                    <p style={{fontSize: "10px", paddingRight: '10%'}}>{launch.rocket.rocket_name}</p>
            </div>
            <h3 style={{fontWeight: 'bold', fontSize: '1em'}}>{launch.mission_name}</h3>
        </div>
    );
};

export default LaunchCard
