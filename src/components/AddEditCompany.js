import React, { Component } from 'react'
import { db } from '../config/constants'
import EditForm from './EditForm.jsx'
import SplashScreen from './SplashScreen'
import firebase from 'firebase'
require('firebase/firestore')

export default class AddEditCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dynamicCompanyName: '',
            companyProvider: '',
            companyData: [],
            spd: '',
            companyFormName: '',
            companyFormUrl: '',
            changesSubmitted: false,
            providerWebsite: '',
            adding: true,
            staticCompanyName: this.props.company,
            loading: true
        }
        this.updateCompanyData()
    }

    componentDidMount() {
        console.log('in componentDidMount')
        this.updateCompanyData()
    }

    editForm = (form, url) => {
        this.setState({ formToUpdate: form, formURL: url })
    }

    removeFormToUpdate = () => {
        this.setState({ formToUpdate: '' })
        this.updateCompanyData()
    }

    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    formHandleSubmit = evt => {
        evt.preventDefault()
        console.log('in formHandleSubmit')
        let url = evt.target.companyFormUrl.value
        if (url.startsWith('https://') === false && url.startsWith('http://') === false) url = 'https://' + url

        db.collection('companies').doc(this.state.dynamicCompanyName).collection('Forms')
            .doc('formDoc')
            .set({ [evt.target.companyFormName.value]: url }, { merge: true })
        this.setState({
            companyFormName: '',
            companyFormUrl: ''
        })
        this.updateCompanyData()
    }

    updateCompanyProfile = (evt) => {
        console.log('in updateCompanyProfile')
        evt.preventDefault()
        if (this.state.staticCompanyName === this.state.dynamicCompanyName) {
            evt.preventDefault()
            db.collection('companies').doc(this.state.staticCompanyName)
                .set({ providerName: this.state.companyProvider, spd: this.state.spd, name: this.state.dynamicCompanyName, providerWebsite: this.state.providerWebsite }, { merge: true })
                .then(() => this.updateCompanyData())

            this.setState({ staticCompanyName: evt.target.dynamicCompanyName.value })
        } else {
            console.log('in the else')

            let newCompanyRef = db.collection('companies').doc(this.state.dynamicCompanyName)

            newCompanyRef
                .set({ providerName: this.state.companyProvider, spd: this.state.spd, name: this.state.dynamicCompanyName, providerWebsite: this.state.providerWebsite }, { merge: true })
                .then(() => {

                    let obj = {}

                    this.state.companyData.forEach((ele) => {
                        obj[ele[0]] = ele[1]
                    })

                    console.log('about to set', obj)
                    newCompanyRef.collection('Forms').doc('formDoc').set(obj)

                })
            db.collection('companies').doc(this.state.staticCompanyName).delete()
            this.setState({ staticCompanyName: evt.target.dynamicCompanyName.value, loading: false, changesSubmitted: !this.state.changesSubmitted, adding: false })
        }
    }

    updateCompanyData = () => {
        console.log('in updateComanyData')

        if (this.state.staticCompanyName !== 'newCompany') {
            console.log('in update company data')

            let companyRef = db.collection('companies').doc(this.state.staticCompanyName)

            companyRef.collection('Forms').doc('formDoc')
                .get()
                .then(doc => {
                    let formObj = doc.data(),
                        companyData = []
                    console.log('formObj is', formObj)
                    if (formObj) {
                        Object.keys(formObj).forEach(key => {
                            companyData.push([key, formObj[key]])
                        })
                    }
                    return { companyData, dynamicCompanyName: this.state.staticCompanyName }

                })
                .then(data => {
                    companyRef
                        .get()
                        .then(doc => {
                            let spd = doc.data().spd
                            this.setState({ companyData: data.companyData, dynamicCompanyName: data.dynamicCompanyName, companyProvider: doc.data().providerName, providerWebsite: doc.data().providerWebsite, spd, adding: false, loading: false })
                        })
                })
        } else {
            this.setState({ loading: false })
        }
    }
    
    render() {
        console.log(this.state, 'current state of add/edicomappny')
        return this.state.loading === true
            ? (<SplashScreen />)
            : (
                !this.state.formToUpdate
                    ?
                    <div>
                        <div className="page">
                            {!this.state.adding
                            ?
                                (   <div>
                                        <h2>{this.state.staticCompanyName} Company Info</h2>
                                        <h3>Company Name: {this.state.staticCompanyName}</h3>
                                        <h3>Company Provider: {this.state.companyProvider}</h3>
                                        <h3>Company Provider Website: {this.state.providerWebsite}</h3>
                                        <a target="_blank" rel="noopener noreferrer" href={this.state.spd}>
                                            <h3>Summary Plan Description:  {this.state.spd}</h3>
                                        </a>
                                    </div>
                                )
                            :   <h2>Enter your New Company's Info</h2>
                            }
                           
                            <form onSubmit={this.updateCompanyProfile}>
                                <label style={{ display: 'block', margin: '10px' }} htmlFor="companyName">Company Name:<input
                                    name="dynamicCompanyName" value={this.state.dynamicCompanyName}
                                    required
                                    onChange={this.handleChange} />
                                </label>
                                <label style={{ display: 'block', margin: '10px' }} htmlFor="companyProvider">Company Provider:<input
                                    name="companyProvider" value={this.state.companyProvider}
                                    required
                                    onChange={this.handleChange} />
                                </label>
                                <label style={{ display: 'block', margin: '10px' }} htmlFor="providerWebsite">Company Provider Website:<input
                                    name="providerWebsite" value={this.state.providerWebsite}
                                    required
                                    onChange={this.handleChange} />
                                </label>
                                <label style={{ display: 'block', margin: '10px' }} htmlFor="companyProvider">Summary Plan Description:<input
                                    name="spd" value={this.state.spd}
                                    required
                                    onChange={this.handleChange} />
                                </label>
                                
                                        <button className="buttons" type="submit" style={{ display: 'block', margin: '0 auto' }}>
                                            Submit Changes
                                        </button>
                                        
                                
                            </form>
                        </div>
                        {
                            this.state.adding
                            ? null
                            :
                            (
                            <div className="page">
                                <h2>Company Forms:</h2>
                                <form onSubmit={this.formHandleSubmit}>
                                    <h3>Add new Forms</h3>
                                    <div>
                                        <label htmlFor="companyFormName">Name of form: </label><input
                                            name="companyFormName" onChange={this.handleChange}
                                            required
                                            value={this.state.companyFormName} />
                                    </div>
                                    <div>
                                        <label htmlFor="companyFormUrl">Website of form: </label><input
                                            name="companyFormUrl" onChange={this.handleChange}
                                            required
                                            value={this.state.companyFormUrl} />
                                    </div>
                                    <input className="buttons" type="submit" />
                                </form>
                                <h3>Current Forms:</h3>
                                <ul>
                                    {
                                        this.state.companyData.map((ele, idx) => (
                                            <div key={ele[0]}>
                                                <br />
                                                <p>{"Name of form: "}
                                                    <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                                                        {ele[0]}
                                                    </a>
                                                </p>
                                                <p>{"Link of form: "}
                                                    <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                                                        {ele[1]}
                                                    </a>
                                                </p>
                                                <button type="button" onClick={() => this.editForm(ele[0], ele[1])}>
                                                    Edit Link
                                                    </button>
                                                <button
                                                    type='button'
                                                    onClick={
                                                        () => {
                                                            db.collection('companies').doc(this.state.dynamicCompanyName).collection('Forms')
                                                                .doc('formDoc')
                                                                .update({
                                                                    [ele[0]]: firebase.firestore.FieldValue.delete()
                                                                })
                                                            this.updateCompanyData()
                                                        }
                                                    }>Delete Form</button>
                                                <br />
                                                <br />
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>
                                )
                        }
                        <button className="buttons" type="button" onClick={() => { this.props.returnLink() }}>Back to Admin Home</button>
                        <button
                            className="buttons"
                            type="button"
                            onClick={() => {
                                localStorage.removeItem('admin')
                                this.props.history.push(
                                    '/'
                                )
                            }}>Logout of Admin
                        </button>
                    </div>
                    :
                    (
                        <EditForm formToUpdate={this.state.formToUpdate} formURL={this.state.formURL} company={this.state.dynamicCompanyName} returnLink={this.props.returnLink} returnToSelectedCompany={this.props.returnToSelectedCompany} removeFormToUpdate={this.removeFormToUpdate} history={this.props.history} />
                    )
            )
    }
}

// {
//     this.state.changesSubmitted &&
//     <div>
//         <button style={{ display: 'block', margin: '0 auto' }} type="button" onClick={() => {
//             let newBool = !this.state.changesSubmitted;
//             this.setState({ changesSubmitted: newBool })
//         }}>Click to make additional changes</button>
//         <h1>Your changes were submitted</h1>
//     </div>
// }
