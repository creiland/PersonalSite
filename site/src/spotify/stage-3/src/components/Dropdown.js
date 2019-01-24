import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'

class Dropdown extends Component{
    constructor(props){
      super(props)
      this.state = {
        listOpen: false,
        headerTitle: this.props.title,
        currentMood: 'Happy'
      }
    }
  
    //closes dropdown when clicked outside window
    handleClickOutside(e){
      this.setState({
        listOpen: false
      })
    }
  
    //selects item from dropwdown and updates mood and title of dropdown to the selected item
    selectItem = (title, id, stateKey) => {
      this.setState({
        headerTitle: title,
        listOpen: false,
        currentMood: title
      }, this.props.resetThenSet(id, stateKey))
      this.props.updateMood(title);
    }
  
    //toggles list
    toggleList = () => {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }))
    }
  
    render(){
      const{list} = this.props
      const{listOpen, headerTitle} = this.state
      return(
        <div className="dd-wrapper">
          <div className="dd-header" onClick={this.toggleList}>
            <div className="dd-header-title">{headerTitle}</div>
            {listOpen
              ? <FontAwesome name="angle-up" size="2x"/>
              : <FontAwesome name="angle-down" size="2x"/>
            }
          </div>
          {listOpen && <ul className="dd-list">
            {list.map((item)=> (
              <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
            ))}
          </ul>}
        </div>
      )
    }
}

export default Dropdown;