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
      flickr_images: string[];
    };
}

type LaunchModalProps = {
    launch: Launch;
    onClose: () => void;
};

const LaunchModal: React.FC<LaunchModalProps> = ({ launch, onClose }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    maxWidth: '30em',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '24px',
                        fontWeight: 'bold',
                    }}
                >
                    &times;
                </button>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}
                >
                    <div style={{ flex: 1, padding: '10px', width: '100%', height: 'auto' }}>
                        <img 
                            src={launch.links.flickr_images[0]} 
                            style={{ width: '100%', height: '100%', borderRadius: '8px', marginBottom: '10px',  }}
                        />
                    </div>
                    <div style={{flex: 1, padding: '10px'}}>
                        <h3 style={{fontWeight: 'bold', textAlign: 'center', fontSize: '1.5em', marginBottom: '-0.3em'}}>{launch.mission_name}</h3>
                        <p style={{textAlign: 'center', marginBottom: '10px', fontSize: '0.5em'}}>{(launch.launch_date_local.split('T')[0]).replace(/-/g, "/")}</p>
                        <ul style={{ textAlign: 'left', textDecoration: 'none', listStyle: 'none', fontSize: '0.7em', paddingLeft: 0 }}>
                            <li >Rocket Name: {launch.rocket.rocket_name}</li>
                            <li>Launch Success : {launch.launch_success ? 'Yes' : 'No'}</li>
                        </ul>
                        <p
                            style={{
                                textAlign: 'center',
                                fontSize: '0.8em',
                                marginTop: '20px',
                            }}
                        >{launch.details}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaunchModal;