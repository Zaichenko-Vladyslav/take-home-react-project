import React from 'react';
import axios from 'axios';
import { API_URL } from '../Constants';

export class TableHousesComponent extends React.Component {
    state = {
        housesList1: [],
        housesList2: [],
        housesList3: [],
        buttonClicked: true
    }

    componentDidMount() {
        this.getInitialTables()
    }

    getInitialTables() {
        axios.get(`${API_URL}/houses/get-table-a`)
        .then(res => {
            const housesList1 = res.data;
            this.setState({ housesList1 });
        })
        axios.get(`${API_URL}/houses/get-table-b`)
        .then(res => {
            const housesList2 = res.data;
            this.setState({ housesList2 });
        })
    }

    getTableBWithoutDuplictaes() {
        axios.get(`${API_URL}/houses/get-table-b-without-duplicates`)
        .then(res => {
            const housesList3 = res.data;
            this.setState({ housesList3 });
        })
    }

    render() {
        return (
            <div className='container'>

                <h1 style={{margin: "25px"}} className='text-center'>
                    <b>Take Home interview Project Spatial Laser</b>
                </h1>

                <hr></hr>

                <div className="row">
                    <div className="col-md-6">
                        <h4 className='text-center' style={{"marginBottom": "15px"}}>
                            Table A
                        </h4>
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark text-center">
                                <tr>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.housesList1.map(
                                        houseList1 =>
                                            <tr key={houseList1.id}>
                                                <td>{houseList1.id.address}</td>
                                                <td className='text-center'>{houseList1.id.city}</td>
                                                <td className='text-center'>{houseList1.id.state}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-6">
                        <h4 className='text-center' style={{"marginBottom": "15px"}}>
                            Table B {this.state.buttonClicked ? '' : ' (without duplicates)'}
                        </h4>
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark text-center">
                                <tr>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                </tr>
                            </thead>
                            {this.state.buttonClicked ? <tbody>
                                {
                                    this.state.housesList2.map(
                                        houseList2 =>
                                            <tr key={houseList2.id}>
                                                <td>{houseList2.id.address}</td>
                                                <td className='text-center'>{houseList2.id.city}</td>
                                                <td className='text-center'>{houseList2.id.state}</td>
                                            </tr>
                                    )
                                }
                            </tbody> : <tbody>
                                {
                                    this.state.housesList3.map(
                                        houseList3 =>
                                            <tr key={houseList3.id}>
                                                <td>{houseList3.id.address}</td>
                                                <td className='text-center'>{houseList3.id.city}</td>
                                                <td className='text-center'>{houseList3.id.state}</td>
                                            </tr>
                                    )
                                }
                            </tbody>}
                        </table>
                    </div>
                </div>

                <hr></hr>

                <div className="row" style={{margin: "30px"}}>
                    <div className="col-md-12 text-center">
                        <button disabled={this.state.buttonClicked ? false : true}
                         style={{"verticalAlign": "baseline"}} type="button" 
                         className="btn btn-success btn-lg" onClick={() =>
                            this.setState({buttonClicked: false},
                            this.getTableBWithoutDuplictaes)}>
                            Remove duplicates from Table B
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TableHousesComponent