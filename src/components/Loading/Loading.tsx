import "./Loading.css"
const Loading = () => {
    return (
        <div className="message-bubble message-bubble-response">
      <div className="message-bubble-user" style={{ fontWeight: 800 }}>Tutor</div>
      <div className="loading-animation">
            <div className="is-typing">
                <div className="jump1"></div>
                <div className="jump2"></div>
                <div className="jump3"></div>
                <div className="jump4"></div>
            </div>
        </div>
    </div>
        
    )
}

export default Loading;