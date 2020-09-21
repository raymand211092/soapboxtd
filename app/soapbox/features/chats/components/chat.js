import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Avatar from '../../../components/avatar';
import DisplayName from '../../../components/display_name';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { shortNumberFormat } from 'soapbox/utils/numbers';
import emojify from 'soapbox/features/emoji/emoji';

export default class Chat extends ImmutablePureComponent {

  static propTypes = {
    chat: ImmutablePropTypes.map.isRequired,
    onClick: PropTypes.func,
  };

  handleClick = () => {
    this.props.onClick(this.props.chat);
  }

  stripBreaks = (content) => {
    content = content.replace(/[<]br[^>]*[>]/gi, '');
    content = content.replace(/[<]p[^>]*[>]/gi, '');
    return content;
  }

  render() {
    const { chat } = this.props;
    if (!chat) return null;
    const account = chat.get('account');
    const unreadCount = chat.get('unread');
    const content = chat.getIn(['last_message', 'content']);
    const parsedContent = content ? emojify(content) : '';

    return (
      <div className='account'>
        <button className='floating-link' onClick={this.handleClick} />
        <div className='account__wrapper'>
          <div key={account.get('id')} className='account__display-name'>
            <div className='account__avatar-wrapper'>
              <Avatar account={account} size={36} />
            </div>
            <DisplayName account={account} />
            <span
              className='chat__last-message'
              dangerouslySetInnerHTML={{ __html: this.stripBreaks(parsedContent) }}
            />
            {unreadCount > 0 && <i className='icon-with-badge__badge'>{shortNumberFormat(unreadCount)}</i>}
          </div>
        </div>
      </div>
    );
  }

}
