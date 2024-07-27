import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
  }
  componentDidMount(){
    this.updateNews();
  }
 
  async updateNews(){
    this.props.setProgress(0)
    console.log(this.state.page)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json()

    await this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
      page: this.state.page + 1
    })
    this.props.setProgress(100)

  }
 /*
  handlePrevClick = async ()=>{
    await this.setState({page: this.state.page - 1})
    this.updateNews()
  }

  handleNextClick = async ()=>{
    await this.setState({page: this.state.page + 1})
    //this.fetchMoreData()
  } */

  fetchMoreData = async ()=> await this.updateNews();
  

  render() {
    return (
      <div>
      {/* <div className='container my-2 my-md-3'> */}
        <h2 className='text-center mb-3 mb-md-4'>NewsMonkey - Top {this.props.category} Headlines</h2>
         {this.state.loading && <Spinner/>}
         {/* <div className='row'> */}
          {/* {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-12 col-md-4 mb-3" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 45):''} description={element.description?element.description.slice(0, 88):''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>
          })} */}
          
           <InfiniteScroll 
            dataLength={this.state.articles.length}
            next={this.fetchMoreData} 
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          > 
            <div className='container my-2'>
              <div className='row'>
              
          {this.state.articles.map((element)=>{
            return <div className="col-12 col-md-4 mb-3" key={element.url} >
              <NewsItem title={element.title?element.title.slice(0, 45):''} description={element.description?element.description.slice(0, 88):''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>
          })}
          </div>
            </div>
          </InfiniteScroll>
         {/* </div> */}
        {/* <div className='conrainer d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}> Next &rarr; </button>
        </div> */}
       {/* </div> */}
       </div>
    )
  }
}

export default News
