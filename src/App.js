import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    // console.log('componentDidMount');
    // await lottery.methods.manager().call().then(console.log);
    // await web3.eth.getBalance(lottery.options.address).then(console.log);
    // console.log('lottery address:', lottery.options.address);
    // console.log(lottery);

    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers.call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager, players, balance}); // same as: this.setState({manager: manager, players: players, balance: balance})
    console.log(this.state);
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ message: 'Transaction in progress. Please wait...' })
    const accounts = await web3.eth.getAccounts();
    const player = accounts[0];
    await lottery.methods.join().send({
      from: player,
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have succesfully joined the lottery.' })
  }

  onClick = async (event) => {
    event. preventDefault();

    this.setState({message: 'Picking a winner. Please wait...'});
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const winner = await lottery.methods.getWinner().call();
    this.setState({message: 'The lottery was won by ', winner});
  }

  render() {
    console.log(web3);
    // web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.
            There are currently {this.state.players.length} peopled joined
            competing to win {web3.utils.fromWei(this.state.balance)} ether.
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck and win a lottery?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <button>Join</button>
          </div>
        </form>
        <hr />
        <h1>{this.state.message}</h1>
        <hr />
        <h4>Pick a winner:</h4>
        <button onClick={this.onClick}>Pick a winner...</button>
      </div>
    )
    /* <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div> */
  }
}

export default App;
