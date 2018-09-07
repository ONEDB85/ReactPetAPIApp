
import React from "react";
import { render } from "react-dom";
import Results from './Results';
import { Router, Link } from "@reach/router";
import pf from 'petfinder-client';
import { Provider } from './SearchContext';
import Details from "./Detail";
import SearchParams from "./SearchParams";

const petfinder = pf({
    key: process.env.API_KEY,                                 
    secret: process.env.API_SECRET
})

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            location: "Detroit, MI",
            animal:"",
            breed:"",
            breeds:[],
            handleAnimalChange: this.handleAnimalChange,
            handleBreedChange: this.handleBreedChange,
            handleLocationChange: this.handleLocationChange,
            getBreeds: this.getBreeds
        }
    }
    handleLocationChange = event => {
        this.setState({
            location: event.target.value
        });
    };
    
    handleAnimalChange = event => {
        this.setState(
            {
            animal: event.target.value,
            breed: ""
            }, 
        this.getBreeds);
    };
    handleBreedChange = event =>{
        this.setState({
            breed: event.target.value
        });
    }
    getBreeds(){
        if(this.state.animal){
            petfinder.breed.list({ animal:this.state.animal }).then(data=>{
                if(data.petfinder && data.petfinder.breeds && Array.isArray(data.petfinder.breeds.breed)
                ){
                    this.setState({
                        breeds: data.petfinder.breeds.breed
                    })
                }
            });
        }else{
            this.setState({ breeds:[] });
        }
    }
    render(){
        return (
            <div>
                <header>
                     <Link to ="/">Adopt Me!</Link>
                </header>
                <Provider value = {this.state}>
                    <Router>
                        <Results path ="/"/>
                        <Details path = "/details/:id"/>
                        <SearchParams path ="/search-params"/>
                    </Router>
                </Provider>
            </div>
        )
    }
}

render(<App />, document.getElementById("root"));



    //     return React.createElement("div", {}, [
    //         React.createElement("h1", { onClick: this.handleTitleClick }, "Adopt Me!"),
    //         React.createElement(Pet, {
    //             name: "Luna",
    //             animal: "cat",
    //             breed: "Cockatiel"
    //         }),
    //         React.createElement(Pet, {
    //             name: "Pepper",
    //             animal: "dog",
    //             breed: "Cotiel"
    //         }),
    //         React.createElement(Pet, {
    //             name: "Peer",
    //             animal: "bird",
    //             breed: "Coatiel"
    //         })
    //     ])

    // }


       // handleTitleClick() {
    //     alert("you clicked the title")
    // }

     // <pre>
            //     <code>{JSON.stringify(this.state, null, 4)}</code>
            // </pre>