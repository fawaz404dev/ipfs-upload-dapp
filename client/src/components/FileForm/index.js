import { Form, Button } from 'rimble-ui';
import React from 'react';

import ipfs from '../../utils/ipfs';
import styles from './FileForm.module.scss';

class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { validated: false, buffer: '', ipfsHash: '', txHash: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  async componentDidMount() {
    const ipfsHash = await this.props.instance.methods.ipfsHash().call();
    this.setState({ ipfsHash });
  }

  //Take file input from user
  captureFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  //Convert the file to buffer to store on IPFS
  convertToBuffer = async reader => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    this.setState({ buffer });
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ validated: true });
    try {
      //save document to IPFS,return its hash, and set hash to state
      const results = await ipfs.add(this.state.buffer);
      this.setState({ ipfsHash: results[0].hash });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    // call Ethereum contract method "sendHash" and .send IPFS hash to ethereum contract
    //set transaction hash to state
    const tx = await this.props.instance.methods.setHash(this.state.ipfsHash).send({ from: this.props.accounts[0] });
    this.setState({ txHash: tx.transactionHash });
  }

  handleValidation(e) {
    e.target.parentNode.classList.add('was-validated');
    this.captureFile(e);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <Form.Field label="Submit file" width={1}>
          <Form.Input type="file" required width={1} onChange={this.handleValidation} />
        </Form.Field>
        Submission will upload file to IPFS and store the corresponding hash on Ethereum.
        <Button type="submit" width={1}>
          Submit
        </Button>
        File's hash stored in current contract state:&nbsp;
        <a href={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} target={'_blank'}>
          {this.state.ipfsHash}
        </a>
        {this.state.txHash ? <p>Transaction: {this.state.txHash}</p> : <></>}
      </Form>
    );
  }
}

export default FileForm;
