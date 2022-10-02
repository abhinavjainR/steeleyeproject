// 3. Please fix and optimize the component as much as you can think of considering best practices
// Ans: 

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={onClickHandler(Boolean(index))} //it should give boolean value
    >
      {text}
    </li>
  );
};
WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({items}) => {

    //setState is altered
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    //we have to pass true in place of null
    setSelectedIndex(true);
  }, [items]);

  const handleClick = index => {
    //Data type boolean is required
    setSelectedIndex(Boolean(index));

    console.log("Index Value: "+index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
          //Key value pair is missing
          key={index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {

    //It should be arrayOf instead of shapeOf
    
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

//Fixed items :[null]
WrappedListComponent.defaultProps = {
  items:  [
    { index: 1, text: "Abhinav" },
    { index: 2, text: "Jain" },
    

  ]
};

const List = memo(WrappedListComponent);

export default List;