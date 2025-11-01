import { Component } from "react";

export default class Message extends Component{
    render() {
        return(
            <div className="min-h-max lg:max-w-[400px] bg-[#15616d] shadow-2xl rounded-2xl" style={{ padding: '0.8rem', paddingInline: '1.2rem' }}>
                <span className="text-[#001524]">
                    @{this.props.autore}
                </span>
                {
                    this.props.media ? 
                    (
                        <div style={{ marginBlock: "0.5rem" }}>
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${this.props.media}`}
                                alt="media"
                                loading="lazy"
                                className="rounded-2xl"
                            />
                        </div>
                    ) :
                    null
                }
                <p className="text-[#ffecd1] text-lg wrap-break-word">
                    {this.props.messageText}
                </p>
                <span className="text-sm text-gray-900">
                    {this.props.data}
                </span>
            </div>
        );
    }
}