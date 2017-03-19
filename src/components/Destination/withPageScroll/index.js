import React from 'react';

export const withPageScroll = (WrappedComponent) => {
  return class PageScroll extends React.Component {

    constructor(props) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.previous = 0;
      this.next = 1;
      this.current = 0;
      this.state = {
        page: this.current,
        direction: undefined
      }
    }

    componentDidMount() {
      window.document.addEventListener('wheel', this.onScroll);
      window.document.addEventListener('keydown', this.onKeyDown);
      window.document.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
      window.document.removeEventListener('wheel', this.onScroll);
      window.document.removeEventListener('keydown', this.onKeyDown);
      window.document.removeEventListener('keyup', this.onKeyUp);
      this.clearTimeouts();
    }

    clearTimeouts() {
      if (this.keydownTimer) {
        clearTimeout(this.keydownTimer);
        this.keydownTimer = null;
      }

      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
        this.scrollTimer = null;
      }
    }

    onScroll(event) {
      const direction = event.wheelDeltaY < 0 ? 'down' : event.wheelDeltaY > 0 ? 'up' : undefined;

      if (direction) {
        event.preventDefault();
      }

      if (direction === 'down') {
        if (this.current !== this.next) {
          this.current = this.next;
          this.updateState('down', this.current);
        }
      } else if (direction === 'up') {
        if (this.current !== this.previous) {
          this.current = this.previous;
          this.updateState('up', this.current);
        }
      }

      this.clearTimeouts();

      this.scrollTimer = setTimeout(() => this.setNextAndPreviousIndexes(), 80);
    }

    setNextAndPreviousIndexes() {
      this.next = this.current + 1;
      if (this.maxPage && this.next > this.maxPage) {
        this.next = this.maxPage;
      }

      this.previous = this.current - 1;
      if (this.previous < 0) {
        this.previous = 0;
      }
    }

    onKeyUp() {
      this.clearTimeouts();
    }

    onKeyDown(event) {
      if (!this.keydownTimer) {
        this.onKeyEvent(event);
        this.keydownTimer = setTimeout(() => this.onKeyEvent(event), 500);
      }
    }

    onKeyEvent(event) {
      const direction = event.which === 40 ? 'down' : event.which === 38 ? 'up' : undefined;
      if (direction === 'down') {
        this.current += 1;
        if (this.maxPage && this.current > this.maxPage) {
          this.current = this.maxPage;
        }
        this.updateState('down', this.current);
        this.setNextAndPreviousIndexes();
        this.keydownTimer = null;
      } else if (direction === 'up') {
        this.current -= 1;
        if (this.current < 0) {
          this.current = 0;
        }
        this.updateState('up', this.current);
        this.setNextAndPreviousIndexes();
        this.keydownTimer = null;
      }
    }

    updateState(direction, page) {
      this.setState({
        page: page,
        direction: direction
      });
    }

    gotoPage(page) {
      const direction = page < this.current ? 'up' : 'down';
      this.current = page < 0 ? 0 : page;
      this.updateState(direction, this.current);
      this.setNextAndPreviousIndexes();
    }

    setMaxPage(maxPage) {
      this.maxPage = maxPage;
    }

    render() {
      return <WrappedComponent setMaxPage={maxPage => this.setMaxPage(maxPage)} gotoPage={page => this.gotoPage(page)} scroll={this.state} {...this.props} />;
    }
  }
}
