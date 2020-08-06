import React, { Component } from 'react'
import { Collapse, Button } from 'react-bootstrap';
import DateTime from 'react-datetime';
import moment from 'moment';
import Config from '../dm.json';
import { config } from 'process';
class Search extends React.Component<{handleFilter:any},{query?:any,filter:any,open:boolean,selectedFilter:string}> {

 filterSet:any={};
 filterList:any=[];
 constructor(props: any){
    super(props);
    this.state = {
      query: '',
      filter: {},
      open: false,
      selectedFilter: "0"
    }
    this.filterList= Config.list.article["filter"];
    if(this.filterList.includes("created")){
     this.filterSet["created"]={from:'',to:''};
    }
    if(this.filterList.includes("author")){
      this.filterSet["author"]="";
    }
 }

 groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}

createdFilterBtnHandler=(type:string,e:any)=>{
  let filterValues= {...this.state.filter};
  
  this.filterSet[type] instanceof HTMLInputElement?filterValues[type]=this.filterSet[type].value:
  filterValues[type]=["between",this.filterSet[type].from.state.inputValue+","+this.filterSet[type].to.state.inputValue]
  // typeof this.filterSet[type] === 'object'?
  // filterValues[type]=["between",this.filterSet[type].from.state.inputValue+","+this.filterSet[type].to.state.inputValue]
  // : filterValues[type]=this.filterSet[type];
  this.setState({filter:filterValues});
  
}

deleteFilter=(key:string,e:any)=>{
  let filterValues= {...this.state.filter};
  
  delete filterValues[key];
  this.setState({filter:filterValues});
}
 handleOptionChange=(e:any)=> {
    e.preventDefault();
    this.setState({selectedFilter:e.currentTarget.value})
 }
 createFilterQuery=()=>{
  let filterQuery=""
  if(this.state.filter){
    Object.keys(this.state.filter).map((key:any,index:number)=>{
      
      index===0?filterQuery="?":filterQuery+="&";

      if(Array.isArray(this.state.filter[key]))// if(key=="created"|| key=="modified")
        {
          filterQuery+=key+'='+this.state.filter[key][0]+':'+this.state.filter[key][1];
        }
        else{
          filterQuery+=key+'='+this.state.filter[key];
        }
      });
  }

 

  console.log(filterQuery);

 }
 

 handleDateChange=(val:any,selectedFilter:string,e:any)=>{

  let value = (moment(e._d).format('L'))
  let filterValues= [...this.state.filter];

   if(this.state.filter.find(x=>x.filterId==selectedFilter && x.text== val)){
      let objIndex = filterValues.findIndex((x=>x.filterId==selectedFilter && x.text==val));
      filterValues[objIndex].value=value;
   }
   else{
    const filterVaule= {text:val,value:value,filterId:selectedFilter}
    filterValues.push(filterVaule);
    console.log(filterValues);
   }

   this.setState({filter:filterValues});
 }
  handleInputChange = (e:any) => {
     
     this.setState({query: e.currentTarget.value})
  }
 render() {
 
 
   return (
     <div>
     {this.filterList.length>0 && <div>
      
      {this.state.filter&& Object.keys(this.state.filter).map((key:any,index:number)=><div style={{display:"inline",padding: "5px",margin:"3px" ,border:"1px solid black"}} key={index}>{key+"-"+this.state.filter[key]}&nbsp;<i className="fa fa-times" aria-hidden="true" onClick={this.deleteFilter.bind(this,key)}></i></div>)}
      <br/><input
        placeholder="Search for..."
        onChange={this.handleInputChange}
      />
      {/* this.props.handleFilter.bind(this,this.state.filter,this.state.query) */}
      <button onClick={this.createFilterQuery}>filter</button>
       <Button 
      onClick={() => this.setState({open:!this.state.open})}
      aria-controls="filter-area"
      aria-expanded={this.state.open}
    >
     <i className="fas fa-caret-down"></i>
    </Button>
    <Collapse in={this.state.open}>
      <div id="filter-area">

       Properties:<select onChange={this.handleOptionChange}>
         <option value="0">select </option>
        
          {this.filterList.map(p=>(<option value={p}>{p}</option>))}
        
       </select>
      { this.state.selectedFilter && this.state.selectedFilter==="created"?(<>
       from :<DateTime className='fieldtype-datetime-date' timeFormat={false} ref={(input) => this.filterSet["created"].from = input}  dateFormat="DD-MM-YYYY"/>
       To :<DateTime className='fieldtype-datetime-date' timeFormat={false} ref={(input) => this.filterSet["created"].to = input} dateFormat="DD-MM-YYYY"/>
       <button  onClick={this.createdFilterBtnHandler.bind(this,this.state.selectedFilter)}>{this.state.filter[this.state.selectedFilter]?'Updated':'add'}</button></>
       ):this.state.selectedFilter==="author"?(<><input type="text" ref={(input) => this.filterSet["author"] = input} ></input> <button  onClick={this.createdFilterBtnHandler.bind(this,this.state.selectedFilter)}>{this.state.filter[this.state.selectedFilter]?'Updated':'add'}</button></>):""
      }
      </div>
    </Collapse>
   
     
    </div>}
    </div>
   )
 }
}

export default Search