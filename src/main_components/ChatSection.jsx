import './styles/chat_section.css';
import PromptField from './form_components/PromptField';
import Chat from './Chat'
import Icon from './form_components/Icon';
import sendIcon from './assets/icons/send-2.svg';
import conversation from './data/conversation.js';


function ChatSection() {

    return (
        <main>
            <div className="chat-container">

                {conversation.map((chat) => {
                    return (
                        <Chat 
                            user={chat.user}
                            profileImg="profile-img"
                            content={chat.content} 
                        />
                    )}
                )}

            </div>
            <section>
                <PromptField
                    name ="otp"
                    placeholder ="Type something here"
                />
                <button>
                    <Icon 
                        icon={sendIcon}
                        style={{height: "35px", width: "35px"}}
                    />
                </button>
            </section>
        </main>
    )

}

export default ChatSection