import React, { Component } from 'react';
import ProjectCard from "../ProjectCard"
import { Link } from 'react-router-dom';
import spotifyimg from '../../img/spotifyimg.png';
import KCCIMG from '../../img/KCCIMG.png'
import Info300 from '../../img/info300.png'
import SIF from '../../img/sif.png'
import salary from '../../img/salary.png'

class DataScienceProjects extends Component{
    render() {
        return (
            <div className="card-grid">
                <ProjectCard 
                    name="Predicting House Prices with ML" 
                    collabs="Yu Ting Chen, Yusha Wang" 
                    date="Fall, 2018" 
                    img={KCCIMG}
                    tech="R, Python, Random Forest, XGBoost" 
                    github="https://github.com/creiland/KCCHousePrices"
                    link="/datascience/houseprices/"/>
                <ProjectCard 
                    name="Predicting Trends in the Billboard Hot100" 
                    collabs="Sam Yoshikawa, Sam Sturtevant" 
                    date="Fall, 2018" 
                    img={Info300} 
                    tech="Python, Spotify API" 
                    github="https://github.com/creiland/Info300Final"
                    link="/datascience/spotify/"/>
                <ProjectCard 
                    name="Seattle Opioid Epidemic" 
                    collabs="Kyle Goodwin, Warren Cho" 
                    date="Fall, 2017" 
                    img={SIF} 
                    tech="R, Shiny" 
                    github="https://github.com/warcho/SafeInjection"
                    link="https://kylegoodwin.shinyapps.io/king-county-sif/"/>
                <ProjectCard 
                    name="Washington State Salary Analysis" 
                    collabs="Kyle Goodwin" 
                    date="Spring, 2017"
                    img={salary}
                    tech="R, Shiny" 
                    github="https://github.com/kylegoodwin/final-project"
                    link="https://kylegoodwin.shinyapps.io/washington-salary-visualization/"/>
            </div>
        )
    }
}

export default DataScienceProjects;