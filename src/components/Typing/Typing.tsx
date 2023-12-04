import "./Typing.css"
const Typing = ({error} : {error:string | undefined}) => {
    return (
        <div className="message-bubble message-bubble-response">
      <div className="message-bubble-user" style={{ fontWeight: 800 }}>Rocky</div>
      <div className="loading-animation">
            {error !== undefined  ? <div className="is-typing">{error}</div> : 
            <div className="is-typing">
                <div className="jump1"></div>
                <div className="jump2"></div>
                <div className="jump3"></div>
                <div className="jump4"></div>
            </div>}
        </div>
    </div>
        
    )
}

export default Typing;