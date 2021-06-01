import React from 'react';
import './Profile.scss'

export default function Profile(): React.ReactElement {
  const placeholder = 'data:image/svg+xml;base64,CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTY' +
    'iIGhlaWdodD0iMTYiIGZpbGw9ImN1cnJlbnRDb2xvciIgY2xhc3M9ImJpIGJpLXBlcnNvbi1jaXJjbGUiIHZpZXdCb3g9IjAgMCAxNiAxNiI+Ci' +
    'AgPHBhdGggZD0iTTExIDZhMyAzIDAgMSAxLTYgMCAzIDMgMCAwIDEgNiAweiIvPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgO' +
    'GE4IDggMCAxIDEgMTYgMEE4IDggMCAwIDEgMCA4em04LTdhNyA3IDAgMCAwLTUuNDY4IDExLjM3QzMuMjQyIDExLjIyNiA0LjgwNSAxMCA4IDEw' +
    'czQuNzU3IDEuMjI1IDUuNDY4IDIuMzdBNyA3IDAgMCAwIDggMXoiLz4KPC9zdmc+'

  return (
    <>
      <img alt="" src={placeholder} id="profile-img" />
      <div id="profile-info">
        <div id="profile-name">Guest</div>
        <div id="profile-type">No account created</div>
      </div>
    </>
  )
}
