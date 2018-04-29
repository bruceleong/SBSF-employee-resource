import React, { Component } from 'react'
import { db } from '../config/constants'
import { connect } from 'react-redux'
import { getCompanyData } from '../store'
import SplashScreen from './SplashScreen'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstAttempt: true,
            videoData: [],
            articleData: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getNewsData()
        this.getVideoData()
    }

    getVideoData = () => {
        db.collection('videos').doc('videoData')
            .get()
            .then(snapshot => {
                let videos = snapshot.data(),
                    videoData = []

                Object.keys(videos).forEach(key => {
                    if (key) {
                        videoData.push([key, videos[key]])
                    }
                })
                this.setState({ videoData, loading: false })
            })
    }

    getNewsData = () => {
        db.collection('articles').doc('newsArticles')
            .get()
            .then(snapshot => {
                let articles = snapshot.data(),
                    articleData = []
                Object.keys(articles).forEach(key => {
                    articleData.push([key, articles[key]])
                })
                this.setState({ articleData })
            })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        this.props.loadCompanyData(evt.target.selectCompany.value)
        this.props.history.push(`/companyHome`)
    }

    handleInput = (evt) => {
        evt.preventDefault()
        let lowerCaseAllCompanies = this.props.allCompanies.map(ele => ele.toLowerCase())
        let idx = lowerCaseAllCompanies.indexOf(evt.target.inputField.value.toLowerCase())
        if (idx === -1) {
            this.setState({ firstAttempt: false })

        } else {
            this.props.loadCompanyData(this.props.allCompanies[idx])
            localStorage.setItem('company', this.props.allCompanies[idx])
            this.props.history.push(`/companyHome`)
        }
    }

    render() {
        return (
            <div className="page">
                <div>
                    <h1>Welcome to your Employee Resource</h1>
                    <h2>by Side by Side Financials</h2>
                    <p>On "Employee Resource", you can access your 401(k) account and get comprehensive information about your retirement planning. Retirement Planning is an important phase in your life. As you continue your working career, we are here to provide you the tools and education you need to help reach your retirement goals.</p>
                    <div className="page">
                        {!localStorage.getItem('company')
                            ?
                            <div>
                                <h4>Enter your company name for more details on your retirement plan:</h4>
                                <form onSubmit={this.handleInput}>
                                    <input type="text" name="inputField" />
                                    <input type="submit" />
                                </form>
                                {
                                    this.state.firstAttempt
                                        ? null
                                        : <p style={{ color: 'red' }}>That input didn't match any registered company</p>
                                }
                            </div>
                            :
                            <button
                                className="buttons"
                                type="button"
                                onClick={() => {
                                    localStorage.removeItem('company')
                                    this.props.history.push(
                                        '/'
                                    )
                                }}>Logout
                        </button>
                        }
                    </div>
                </div>
                <div>
                    {
                        this.state.loading === true
                            ? <SplashScreen />
                            :
                            <div>
                                <h1>Our Favorite Videos</h1>
                                <div className="videos">
                                    {
                                        this.state.videoData.length === 0
                                            ? <h2>We are updating this page, check back soon</h2>
                                            :
                                            this.state.videoData.map(video => (
                                                <div key={video[0]} className="video">
                                                    <div className="videoContainer">
                                                        <h2>{video[0]}</h2>
                                                        <iframe width="320" title="News video" height="auto" src={video[1]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>
                                <h1>Our Top Articles</h1>
                                <div className="articles">
                                    {
                                        this.state.articleData === 0
                                            ? <h2>We are updating this page, check back soon</h2>
                                            :
                                            this.state.articleData.map(article => (
                                                <div key={article[0]} className="article">
                                                    <div className="articleContainer">
                                                        <a target="_blank" rel="noopener noreferrer" href={article[1]}>
                                                            <h4><b>{article[0]}</b></h4>
                                                        </a>
                                                        <a target="_blank" rel="noopener noreferrer" href={article[1]}>
                                                            <p><strong>Read Article Here</strong></p>
                                                        </a>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

const mapState = ({ allCompanies }) => ({
    allCompanies
})

const mapDispatch = (dispatch) => ({
    loadCompanyData(company) {
        dispatch(getCompanyData(company))
    }
})

export default connect(mapState, mapDispatch)(Home)
