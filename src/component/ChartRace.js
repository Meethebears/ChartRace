import React, { Component } from 'react';
import './style.css';

export default class ChartRace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.sort((a, b) => b.value - a.value),
            temp: this.props.data,
            maxValue: Math.max.apply(Math, this.props.data.map(item => item.value))
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newProps = [...nextProps.data];
        return {
            data: nextProps.data,
            temp: newProps.sort((a, b) => b.value - a.value),
            maxValue: Math.max.apply(Math, nextProps.data.map(item => item.value))
        };
    }

    CheckRegion = (title) => {
        switch (title) {
            case 'China':
            case 'India':
            case 'Japan':
            case 'Indonesia':
            case 'Bangladesh':
                return 'rgb(67, 40, 231)';
            case 'Russia':
            case 'Germany':
            case 'UK':
            case 'Italy':
            case 'France':
                return 'rgb(150, 84, 229)';
            case 'USA':
            case 'Brazil':
                return 'rgb(255, 197, 2)';
            default:
                return '#ccc'; // Default color if country is not found
        }
    };

    ImgFlag = [
        { title: 'China', img: 'https://cdn.countryflags.com/thumbs/china/flag-round-250.png' },
        { title: 'India', img: 'https://cdn.countryflags.com/thumbs/india/flag-round-250.png' },
        { title: 'USA', img: 'https://e7.pngegg.com/pngimages/997/847/png-clipart-flag-of-the-united-states-flags-of-the-world-flag-of-china-united-states-flag-usa-thumbnail.png' },
        { title: 'Russia', img: 'https://e7.pngegg.com/pngimages/405/294/png-clipart-round-white-blue-and-red-illustration-flag-of-russia-computer-icons-russia-blue-flag-thumbnail.png' },
        { title: 'Japan', img: 'https://png.pngtree.com/png-vector/20240108/ourmid/pngtree-japan-round-flag-glossy-glass-effect-vector-transparent-background-png-image_11427460.png' },
        { title: 'Indonesia', img: 'https://www.shutterstock.com/image-vector/flag-indonesia-icon-standard-color-260nw-2313262177.jpg' },
        { title: 'Germany', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuwM_Ckjrz--tXicN9jblOg0QI4tGB2N0h3A&s' },
        { title: 'Brazil', img: 'https://cdn.countryflags.com/thumbs/brazil/flag-round-250.png' },
        { title: 'UK', img: 'https://www.infowheels.eu/wp-content/uploads/2016/07/united-kingdom-flag-round-large.png' },
        { title: 'Italy', img: 'https://as2.ftcdn.net/v2/jpg/00/17/95/67/1000_F_17956761_u1MEJ9wDyqRwTMucT58YiI7QHjzLF3k0.jpg' },
        { title: 'Bangladesh', img: 'https://media.istockphoto.com/id/906043228/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-v%C3%B2ng-vector-c%E1%BB%9D-bangladesh.jpg?s=170667a&w=0&k=20&c=Png5Vizmz14nl3QxxdF0vnsWgSD_1ly5xOyutOMmbHk=' },
        { title: 'France', img: 'https://cdn-icons-png.flaticon.com/512/197/197560.png' }
      ];

    draw(item, index) {
        const indis = this.state.temp.findIndex(temp => temp.id === item.id);
        const translateY = indis === 0 ? this.props.padding : (this.props.padding + (indis * this.props.itemHeight) + (indis * this.props.gap));
        const flagObj = this.ImgFlag.find((element) => element.title === item.title);
        const flagUrl = flagObj ? flagObj.img : ''
        return (
            <div key={index} className="raceItem" style={{ height: this.props.itemHeight, transform: 'translateY(' + translateY + 'px)' }}>
                <div style={{ display: 'flex', width: '100px', justifyContent: 'flex-end',marginRight:'5px' }}>{item.title}</div>
                <b style={{ display: 'flex',justifyContent:'flex-end',alignItems:'center', backgroundColor: this.CheckRegion(item.title), width: item.value / this.state.maxValue * (this.props.width - 120 - (2 * this.props.padding)) }}>
                    <img src={flagUrl} alt="Flag" width={35} height={35} style={{ overflow:'hidden',clipPath:'circle(40%)'}}></img>
                </b>
                <span>
                    {/* <em style={this.props.titleStyle}>{item.title}</em> */}
                    <i style={this.props.valueStyle}>{item.value}</i>
                </span>
            </div>
        );
    }

    render() {
        return (
            <div className="raceArea" style={{ backgroundColor: this.props.backgroundColor, paddingTop: this.props.padding, paddingBottom: this.props.padding, width: this.props.width, height: (2 * this.props.padding) + (this.state.temp.length * this.props.itemHeight) + ((this.state.temp.length - 1) * this.props.gap) }}>
                {this.state.data.map((item, index) => this.draw(item, index))}
            </div>
        );
    }
}

ChartRace.defaultProps = {
    data: [],
    backgroundColor: '#f9f9f9',
    width: 680,
    padding: 20,
    itemHeight: 38,
    gap: 4,
    titleStyle: { font: 'normal 400 13px Arial', color: '#212121' },
    valueStyle: { font: 'normal 400 11px Arial', color: '#777' }
};
