import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdHelp } from "react-icons/md";
import Button from "react-bootstrap/Button"


/**
 * How to Use TooltipField components in Other components
 * Import TooltipField in other Components
 * Place <TooltipField/> 
 * @param {Object} props - 
 */

// type = text, email, number , 
const TooltipField = props => {
  const { tooltipText, placement, tooltipButtonInfo } = props;
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );
  return (
    <OverlayTrigger
      placement={placement || "top"}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant="success">{tooltipButtonInfo || <MdHelp />}</Button>
    </OverlayTrigger>
  );
}

/**
 * Validate Types of Props
 */
TooltipField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TooltipField;