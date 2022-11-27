import React from "react";

export default class TuitStats extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {this.props.tuit.stats && this.props.tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {this.props.tuit.stats && this.props.tuit.stats.retuits}
        </div>

        <div className="col">
            <span onClick={() => this.props.likeTuit(this.props.tuit)}>
                {
                    this.props.tuit.stats && this.props.tuit.stats.likes > 0 &&
                    <i className="fa-solid fa-thumbs-up" style={{color: 'red'}}></i>
                }
                {
                    this.props.tuit.stats && this.props.tuit.stats.likes <= 0 &&
                    <i className="fa-solid fa-thumbs-up"></i>
                }
                {this.props.tuit.stats && this.props.tuit.stats.likes}
            </span>
        </div>

          <div className="col">
            <span onClick={() => this.props.dislikeTuit(this.props.tuit)}>
                {
                    this.props.tuit.stats && this.props.tuit.stats.dislikes > 0 &&
                    <i className="fa-solid fa-thumbs-down" style={{color: 'red'}}></i>
                }
                {
                    this.props.tuit.stats && this.props.tuit.stats.dislikes <= 0 &&
                    <i className="fa-solid fa-thumbs-down"></i>
                }
                {this.props.tuit.stats && this.props.tuit.stats.dislikes}
            </span>
          </div>

        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
  }
}