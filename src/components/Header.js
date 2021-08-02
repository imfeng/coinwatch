import React from 'react';

const Header = ({
  isLive,
  isActive,
  selected,
  handleClick,
  handleLiveClick
}) => {
  const getSelectState = (key) => selected[key] ? selected[key] : '';
  return (
    <header className="App-header">
      <div className="btn-group" data-toggle="buttons" role="group">
        <button
          value="Live"
          onClick={handleLiveClick}
          className={`live btn  ${isLive ? 'active btn-danger' : 'btn-primary'}`}
        >
          Live
          {isLive ? <div
            style={{ color: '#ffffff' }}
            className="la-ball-scale-multiple la-dark la-sm"
          >
            <div />
            <div />
            <div />
          </div> : null}
        </button>
        <button
          disabled={!isActive}
          value="1m"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('1m')}`}
        >
          1m
        </button>
        <button
          disabled={!isActive}
          value="5m"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('5m')}`}
        >
          5m
        </button>
        <button
          disabled={!isActive}
          value="15m"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('15m')}`}
        >
          15m
        </button>
        <button
          disabled={!isActive}
          value="30m"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('30m')}`}
        >
          30m
        </button>
        <button
          disabled={!isActive}
          value="1h"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('1h')}`}
        >
          1H
        </button>
        <button
          disabled={!isActive}
          value="4h"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('4h')}`}
        >
          4H
        </button>
        <button
          disabled={!isActive}
          value="8h"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('8h')}`}
        >
          8H
        </button>
        <button
          disabled={!isActive}
          value="1d"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('1d')}`}
        >
          1D
        </button>
        <button
          disabled={!isActive}
          value="1w"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('1w')}`}
        >
          1W
        </button>
        <button
          disabled={!isActive}
          value="1M"
          onClick={handleClick}
          type="button"
          className={`btn btn-secondary ${getSelectState('1M')}`}
        >
          1M
        </button>
      </div>
    </header>
  );
};

export default Header;
