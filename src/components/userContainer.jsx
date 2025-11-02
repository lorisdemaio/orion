import { Component } from "react";

export default class UserContainer extends Component{
    render() {
        return(
            <div className="bg-[#001524] flex flex-row justify-start items-center gap-2 w-full rounded-2xl cursor-pointer" style={{ padding: "0.8rem" }} onClick={this.props.click} key={this.props.key} tabIndex={0}>
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
        );
    }
}