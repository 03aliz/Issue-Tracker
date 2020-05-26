import React from 'react';
import Skeleton from 'react-loading-skeleton';
import classes from './SkeletonScreen.module.css';

const skeletonScreen = (props) => {

    return (
        <div className={classes.TicketContainer}>
            <Skeleton count={1} height={180} />
        </div>
    )
}

export default skeletonScreen;