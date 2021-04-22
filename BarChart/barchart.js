viewof order = {
    const options = [
      {label: "2020", value: 2020},
      {label: "2019", value: 2019},
    ];
    const form = html`<form style="display: flex; align-items: center; min-height: 33px;"><select name=i>${options.map(o => html`<option>${document.createTextNode(o.label)}`)}`;
    const timeout = setTimeout(() => {
      form.i.selectedIndex = 2;
      form.onchange();
    }, 2000);
    form.onchange = () => {
      clearTimeout(timeout);
      form.value = options[form.i.selectedIndex].value;
      form.dispatchEvent(new CustomEvent("input"));
    };
    form.value = options[form.i.selectedIndex].value;
    return form;
  }