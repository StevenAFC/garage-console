import React from "react";
import { Menu as SemanticMenu, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function Menu() {
  const history = useHistory();

  const handleLogoutClick = (e, { name }) => {
    history.push("/logout");
  };

  return (
    <SemanticMenu size="large">
      <SemanticMenu.Item header>
        <Icon name="warehouse" />
        Garage Console
      </SemanticMenu.Item>
      <SemanticMenu.Item position="right" link onClick={handleLogoutClick}>
        Logout
      </SemanticMenu.Item>
    </SemanticMenu>
  );
}

export default Menu;
