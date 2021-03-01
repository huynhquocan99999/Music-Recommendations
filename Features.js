import React from 'react';

const Features = ({energy}) => {

    return (
        <div className="offset-md-1 col-sm-4" >
            <div className="row col-sm-12 px-0">
                <label tabIndex={energy}  className="form-label col-sm-12">
                    <label>Energy: </label>
                    {energy}
                </label>
            </div>
        </div>
    );
}
export default Features;