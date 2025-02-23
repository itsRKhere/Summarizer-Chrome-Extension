// Import required dependencies and components
import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Divider, Tooltip } from 'antd';
import { fetchSummarizationOrKeySentences } from '../services/gptService';
import copyIcon from '../assets/copy.svg';
import doneIcon from '../assets/done.svg';
import mainIcon from '../assets/icon.png';
import ClipboardJS from 'clipboard';
import { showError } from '../utils/errorHandler';

// Define the dropdown menu items
const items = [{ label: 'Summary', key: '0' }, { label: 'Major Points', key: '1' }];

// Header component definition
const Header = ({ message, setMessage, setError, setTyping, setShowSkip, error }) => {
  // State variables
  const [loadings, setLoadings] = useState([]);
  const [selected, setSelected] = useState('Summary');
  const [icon, setIcon] = useState(copyIcon);
  const [langText, setLangText] = useState('EN');

  // useEffect to fetch data when selected option or language changes
  useEffect(() => {
    handleButtonClick(1);
  }, [selected, langText]);

  // Function to handle button click
  const handleButtonClick = async (index) => {
    try {
      setError(false);

      // Check for internet connection
      if (!navigator.onLine) {
        throw Error("Please check your internet connection");
      }

      setMessage('');

      // Set loading state for the clicked button
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = true;
        return newLoadings;
      });

      // Get active tab's URL and disabling es-lint to avoid chrome API error
      /* eslint-disable-next-line */
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = tabs[0].url;

      // Determine whether to fetch summary or major points
      const keySentences = selected === "Major Points";
      // Determine the language
      const lang = langText === 'EN' ? false : true;

      // Fetch data from API
      const apiResponse = await fetchSummarizationOrKeySentences(url, keySentences, lang);
      setMessage(apiResponse.result);

      // Reset loading state and set other states
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
      setTyping(true);
      setShowSkip(true);
    } catch (err) {
      // Handle errors
      showError(setError, err);
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
      setShowSkip(false);
    }
  };

  // Handle menu item selection
  const handleMenuClick = (event) => {
    const { key } = event;
    setSelected(items[key].label);
  };

  // Handle copy button click
  const handleCopyClick = () => {
    const clipboard = new ClipboardJS('.icon-div', { text: () => message });
    clipboard.on('success', () => {
      setIcon(doneIcon);
      setTimeout(() => setIcon(copyIcon), 2500);
    });
  }

  // Handle language button click
  const handleLangClick = () => {
    // Toggle between languages
    setLangText((langText === 'EN') ? 'हि' : 'EN');
  }

  // Render the header component
  return (
    <>
      <div className='left-content'>
        <div className='title'>
          <img src={mainIcon} alt='' />
          <Divider type="vertical" />
        </div>
        {/* Tooltip for the language button */}
        <Tooltip placement="right" title={'Language'} arrow={{ pointAtCenter: true }}>
          <div
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f1f1f1'; }}
            onClick={handleLangClick}
            className='icon-div'>
            <div className='lang-div'>{langText}</div>
          </div>
        </Tooltip>
      </div>
      <div>
        <div className='right-content'>
          {/* Tooltip for the copy button */}
          {(message.length) ?
            <Tooltip placement="bottom" title={'Copy'} arrow={{ pointAtCenter: true }}>
              <div
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f1f1f1'; }}
                onClick={handleCopyClick}
                className='icon-div'>
                <img src={icon} alt='' />
              </div>
            </Tooltip> : <></>}
          {/* Dropdown button for selecting options */}
          <Space >
            <Dropdown.Button
              icon={<DownOutlined />}
              loading={loadings[1]}
              menu={{ items, onClick: handleMenuClick }}
              placement="bottomRight"
              onClick={() => handleButtonClick(1)}
              disabled={message.length || error ? false : true}
            >
              {selected}
            </Dropdown.Button>
          </Space>
        </div>
      </div>
    </>
  );
}

// Export the Header component
export default Header;
