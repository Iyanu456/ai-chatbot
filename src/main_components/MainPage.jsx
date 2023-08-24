import React from 'react';
import ChatSection from './ChatSection';
import AsideItem from './AsideItem';
import addIcon from './assets/icons/add.svg';
import history from './data/history.js'
import './styles/main.css';
//import { useLocation } from 'react-router-dom';

const MainPage = () => {
    //const [data, setData] = useState('');
    //const location = useLocation();
    //const email = location.state;

    /**seEffect(() => {
        // Extract the data from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const dataParam = urlParams.get('data');

        // Set the data in the state
        setData(dataParam);
    }, []);**/

    return (
        <div className="main-container" style={{backgroundColor: "rgb(50, 50, 50)"}}>
            <aside>
                <div>
                    <AsideItem
                        className="new-chat"
                        icon={addIcon}
                        content="New Chat" 
                    />
                    <div className="history-tab">
                        {history.map((chatHistory) => {
                            return (
                                <AsideItem
                                    key={chatHistory.id}
                                    className="aside-child"
                                    content={chatHistory.title}
                                />
                            )} 
                        )}
                    </div>
                </div>
                <div className="profile">
                    <div className="profile-pic"></div>
                    <p>Iyanu Oyerinde</p>
                </div>
            </aside>
            <ChatSection />
        </div>
    );
};

export default MainPage;

