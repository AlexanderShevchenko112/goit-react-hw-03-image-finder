import { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/searchbar/Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
class Searchbar extends Component {
  state = {
    query: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.query.trim());
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button className={css.searchFormBtn} type="submit">
            <FaSearch />
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
