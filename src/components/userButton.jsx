import { Component } from "react";

export default class UserButton extends Component{
    render() {
        return(
            <div className="bg-[#001524] flex flex-row justify-between items-center gap-2 w-full rounded-2xl" style={{ padding: "0.8rem" }}>
                <div className="flex flex-row justify-start items-center gap-2">
                    <div>
                        <img
                            src={this.props.profileImg}
                            alt={`profile-img-${this.props.username}`}
                            draggable="false"
                            className="rounded-full size-[50px]"
                        />
                    </div>
                    <span className="text-white text-lg">
                        {this.props.username}
                    </span>
                </div>
                <div>
                    <button className="rounded-full cursor-pointer h-max transition-all duration-300 hover:bg-black/50" style={{ padding: '0.5rem' }} onClick={this.props.click}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person-plus" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
}