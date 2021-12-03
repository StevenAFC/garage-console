import React from "react";
import { Menu as SemanticMenu, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function Menu({ authenticated }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate("/logout");
  };

  return (
    <SemanticMenu size="large">
      <SemanticMenu.Item header>
        <Icon name="warehouse" />
        Garage Console
      </SemanticMenu.Item>
      {authenticated ? (
        <SemanticMenu.Item position="right" link onClick={handleLogoutClick}>
          Logout
        </SemanticMenu.Item>
      ) : null}
    </SemanticMenu>
  );
}

export default Menu;
