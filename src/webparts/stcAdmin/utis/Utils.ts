export function onFieldChange(e,thisObj) {
    let name = e.target.getAttribute('name');
    let value = e.target.value;
    thisObj.setState({
      [name]: value
    });
  }