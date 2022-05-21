//'use strict';

{
  const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
  ];

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container')
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer; //???
    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонной справочик. Владелец ${title}`
    return h1;
  };

  const createCopy = (title) => {
    const p = document.createElement('p');
    p.textContent = `Все права защищены © ${title}`
    return p;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = (params) => {
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      btn = document.createElement('button');
      btn.type = type;
      btn.textContent = text;
      btn.className = className;
      return btn;
    });
    //console.log(btns)
    buttonsWrapper.append(...btns);

    return {
      buttonsWrapper,
      btns
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
      <th class="delete">Удалить</th>
      <th>Имя</th>
      <th>Фамилия</th>
      <th>Телефон</th>
      </tr>
      `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table
  };
  
  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    // const tdChange = document.createElement('td');
    // tdChange.classList.add('change');
    // const buttonChange = document.createElement('button');
    // buttonChange.classList.add('button-change');
    // buttonChange.textContent = 'Редактировать';
    // tdChange.append(buttonChange);

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone);

    return tr;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" 
        id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" 
        id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" 
        id="phone" type="number" required>
      </div>
      `);
      const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);
    return {
      overlay,
      form,
    };
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  }

  const createFooter = (name) => {
    const footer = document.createElement('footer');
    const footerWrapper = createContainer();
    footer.classList.add('footer');
    footer.append(footerWrapper);
    footer.footerWrapper = footerWrapper;
    return footer
  }

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonsWrapper = createButtonsGroup([{
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    }, 
    {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      }]);
    const table = createTable();
    const form = createForm();
    const footer = createFooter();
    const textFooter = createCopy(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonsWrapper.buttonsWrapper, table, form.overlay, form.form);
    footer.footerWrapper.append(textFooter)
    app.append(header, main, footer);
    //console.log(header);
    return {
      list: table.tbody,
    }
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector('#app');
    //const phoneBook = renderPhoneBook(app, title);

    const {list} = renderPhoneBook(app, title);

    renderContacts(list, data);
    // Функционал
  }
  window.PhoneBookInit = init; 
}

