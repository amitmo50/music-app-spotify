import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';

import './Sidebar.css';
import Modal from '../Modal/Modal';
import Toast from '../Toast/Toast';
import {addPlaylist, activePlayList, showSearchBar, setVisabilityRelease} from '../../../store/actions/MusicPlayerActions';

const Sidebar = ({dispatch, MusicPlayerData}) => {
    console.log('render Sidebar');
    const [sidebarState, setState] = useState({
        modal: false,
        toast: '',
    });
    
    const playlistRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const list = playlistRef.current.value;
        dispatch(addPlaylist(list));
        setState({
            ...sidebarState,
            modal: false,
            toast: 'Playlist was created successfully!'
        });
    }

    const changeModalState = () => {
        setState({
            ...sidebarState,
            modal: true,
        });
    }
    const handleVisableRelease = (state) => {
        dispatch(setVisabilityRelease(state))
    }
    const handleSearchBar = () => {
        dispatch(showSearchBar())
    }
    const handleClick = (playlistName) => {
        dispatch(activePlayList(playlistName))
    }
    let playlistKeys = Object.keys(MusicPlayerData.playLists).filter(item => item !== "Discover : Weekly Discovery 2021 ");
    console.log(MusicPlayerData.newReleaseClicked)
  
    return(
        <ul className="Sidebar">
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="logo"/>
            <div className="home-tab">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" className="svg-inline--fa fa-home fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path></svg>
                <h4 className="tab-name" onClick={() => {
                    handleClick("Discover : Weekly Discovery 2021 ")
                    handleVisableRelease(false);
                }
                }>Home</h4>
            </div>
            <div className="search-tab">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                <h4 className="tab-name" onClick={() => handleSearchBar()}>Search</h4>
            </div>
            <div className="library-tab">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" className="svg-inline--fa fa-book fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg>
                <h4 className="tab-name">Your Library</h4>
            </div>
            <hr/>
            <div className="new-release-tab">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="compact-disc" className="svg-inline--fa fa-compact-disc fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM88 256H56c0-105.9 86.1-192 192-192v32c-88.2 0-160 71.8-160 160zm160 96c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"></path></svg>
                <h4 className="tab-name" onClick={() => dispatch(setVisabilityRelease(true))}>New Release</h4>
            </div>
            <br/>
            <strong className="sidebar-title">PLAYLISTS</strong>
            <hr/>
            {MusicPlayerData.playLists?(
                playlistKeys.map(list =>  <div key={list} className="playlist-item">
                            <p onClick={() => {
                                handleClick(list);
                                handleVisableRelease(false);
                            }} className={list === MusicPlayerData.currentPlaylist?'active':''} >
                            {list}
                            </p>
                        </div>)):null}
            <li className="new-playlist" onClick={() => changeModalState()}>
                <i className="fas fa-plus-circle">
                    <span>New Playlist</span>
                </i>
            </li>
            <Modal show={sidebarState.modal} close={() => {
                setState({...sidebarState, modal: false})
            }}>
                {<form onSubmit={handleSubmit}>
                    <div className="title">New Playlist</div>
                    <div className="content-wrap">
                        <input
                            type="text"
                            placeholder="My Playlist"
                            ref={playlistRef}
                            required
                        />
                        <br/>
                        <button type="submit">Create</button>
                    </div>
                </form>}
            </Modal>


            <Toast toast={sidebarState.toast} close={() =>{ 
                setState({
                    ...sidebarState,
                    toast: '',
                });
            }}/>
        </ul>
        
    )
}

const mapStateToProps = ({MusicPlayerData}) => {
    return {MusicPlayerData}
}

export default connect(mapStateToProps)(Sidebar);