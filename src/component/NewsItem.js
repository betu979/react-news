import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props
    return (
      <div>
        <div className="card">
          <div>
          <span className="d-flex justify-content-end position-absolute end-0 badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={imageUrl?imageUrl:"https://imgd.aeplcdn.com/642x336/n/cw/ec/181631/bajaj-cng-freedom-125-left-front-three-quarter4.jpeg?isig=0&q=80"} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
