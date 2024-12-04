import React from 'react';
import styled from 'styled-components';

const BarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  margin: 5px 0;
  border-radius: 5px;
  flex: 95%;
`;

const Bar = styled.div`
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  transition: width 1s ease-in-out;
`;

const Value = styled.div`
  position: absolute;
  left: ${(props) => Math.min(props.position, 100)}%;
  top: 50%;
  transform: translateY(-50%)
  color: black;
  font-weight: bold;
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
  transition: all 1s ease-in-out;
  animation: count-up 1s ease-out forwards;
  @keyframes count-up {
    from {
      transform: translateY(-50%) translateX(10%) scale(0.9);
      opacity: 0;
    }
    to {
      transform: translateY(-50%) translateX(10%) scale(1);
      opacity: 1;
    }
  }
`;

const Flag = styled.img`
  position: absolute;
  left: ${(props) => Math.min(props.position, 100)}%;
  top: 50%;
  transform: translateX(-110%) translateY(-50%);
  height: 30px;
  width: auto;
  border-radius: 50%;
  background-color: none;
`;

const ImgFlag = [
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

const CheckRegion = (title) => {
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
      return 'rgb(150, 84, 229)'
    case 'USA':
    case 'Brazil':
      return 'rgb(255, 197, 2)'
  }
}

const ChartRace = ({ data, year }) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div>
      {sortedData.map((item) => {
        const flagObj = ImgFlag.find((element) => element.title === item.title);
        const flagUrl = flagObj ? flagObj.img : '';

        return (
          <div key={item.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '15%', justifyContent: 'flex-end', display: 'flex', marginRight: '5px' }}>{item.title}</div>
            <BarContainer>
              <Bar width={(item.value / maxValue) * 100} color={CheckRegion(item.title)}>
                <Flag
                  src={flagUrl}
                  alt="Flag"
                  position={(item.value / maxValue) * 100}
                />
              </Bar>
              <Value position={(item.value / maxValue) * 100}>
                {item.value.toLocaleString()}
              </Value>
            </BarContainer>
          </div>
        );
      })}
    </div>
  );
};

export default ChartRace;
