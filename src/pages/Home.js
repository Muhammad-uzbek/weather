import React from 'react';
import { connect } from "react-redux";
import Choices from '../components/Choices'
import Box from '../components/Box';
import './Home.css'
import {
  updateCityAction,
  fetchCityAction,
  getStopAction
} from '../actions/cityActions';
import { loadingAction } from '../actions/uiActions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state={
      bg:'winter'
    }
  }
  fetchData(city) {
    return () => {
      this.props.dispatchFetchCity(city);
      console.log(this.state.bg);
    }
  }

  componentDidMount() {
    this.props.history.listen((location, action) => {
      this.props.dispatchStopFetch();
      this.props.dispatchLoading(false);
    });
  }
  render() {
    return (
      <div className="home"> 
        <Box city={this.props.city} data={this.props.data} loading={this.props.loading} onChange={(bg)=> this.setState('')}/>
        <Choices eventSub={this.fetchData} choices={this.props.choices} className="choices"/>
      </div>
    );
  }
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  dispatchUpdateCity: updateCityAction,
  dispatchFetchCity: fetchCityAction,
  dispatchStopFetch: getStopAction,
  dispatchLoading: loadingAction
};

export const HomeConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
