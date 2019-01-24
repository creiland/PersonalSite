import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf'
import pdf from '../../../pdf/Info370Final.pdf'
import firebase from 'firebase/app'
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

class KCC extends Component{
    constructor(props) {
        super(props);

        this.state = {
            numPages: null,
            pageNumber: 1,
            file: '',
        }
    }
     
      onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      }

      componentDidMount(){
        let current = this;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        storageRef.child('Info370Final.pdf').getDownloadURL().then(function(url) {
            var test = url;
            current.setState({file: test})
            console.log("Success")
        }).catch(function(error) {
            console.log(error)
        });
      }

      componentDidUpdate(){

      }

    render() {
        console.log(this.state.file)
        const { pageNumber, numPages } = this.state;
        return (<div className="res">
                    <Document url={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                </div>)
    }
}
export default KCC;