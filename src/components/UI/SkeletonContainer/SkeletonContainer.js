import React from 'react';
import classes from './SkeletonContainer.module.css';
import SkeletonScreen from './SkeletonScreen/SkeletonScreen';

const skeletonContainer = (props) => {

  // categories
  const notStartedCat = [];
  const inProgressCat = [];
  const testCat = [];
  const reviewCat = [];
  // convert tickets props into array to map over
  const tickets = props.tickets.map((ticket, index) => {

      switch (ticket) {
          case "Not Started":
              notStartedCat.push(<SkeletonScreen key={ticket + index}/>);
              break;

          case "In Progress":
              inProgressCat.push(<SkeletonScreen key={ticket + index}/>);
              break;

          case "Test":
              testCat.push(<SkeletonScreen key={ticket + index}/>);
              break;

          case "Review":
              reviewCat.push(<SkeletonScreen key={ticket + index}/>);
              break;
      }   

      console.log(notStartedCat);
  });


  console.log(notStartedCat);

  return (
      <div className={classes.TicketsContainer}>
          <div className={classes.Tickets}>
              <div className={classes.CategoryTitle}>
                  <h4>NOT STARTED</h4>
              </div>
              {notStartedCat}
          </div>

          <div className={classes.Tickets}>
              <div className={classes.CategoryTitle}>
                  <h4>IN PROGRESS</h4>
              </div>
              {inProgressCat}
          </div>

          <div className={classes.Tickets}>
              <div className={classes.CategoryTitle}>
                  <h4>TEST</h4>
              </div>
              {testCat}
          </div>

          <div className={classes.Tickets}>
              <div className={classes.CategoryTitle}>
                  <h4>REVIEW</h4>
              </div>
              {reviewCat}
          </div>
      </div>
  )
}

export default skeletonContainer