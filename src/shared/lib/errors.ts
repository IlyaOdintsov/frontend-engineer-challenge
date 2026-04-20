type ErrorMap = Record<string, string>;

const registerErrorMap: ErrorMap = {
  'already exists': 'Данный адрес уже занят',
  'Password must include a lowercase letter':
    'Пароль должен содержать строчную букву',
  'Password must include an uppercase letter':
    'Пароль должен содержать заглавную букву',
  'Password must be at least 12 characters long':
    'Пароль должен быть не менее 12 символов',
  default: 'Ошибка регистрации',
};

const loginErrorMap: ErrorMap = {
  'Invalid email or password': 'Введены неверные данные',
  default: 'Ошибка входа',
};

const genericErrorMap: ErrorMap = {
  default: 'Что‑то пошло не так',
};

function findUserError(graphqlError: string, map: ErrorMap): string {
  for (const [key, value] of Object.entries(map)) {
    if (key === 'default') continue;
    if (graphqlError.includes(key)) {
      return value;
    }
  }
  return map.default;
}

export function handleGraphQLError(
  error: any,
  options: {
    for: 'register' | 'login' | 'forgot' | 'reset' | 'generic';
  }
): string {
  const rawMessage =
    error.response?.errors?.[0]?.message || error.message || '';

  let map: ErrorMap;

  switch (options.for) {
    case 'register':
      map = registerErrorMap;
      break;
    case 'login':
      map = loginErrorMap;
      break;
    case 'forgot':

    case 'reset':
    case 'generic':
    default:
      map = genericErrorMap;
      break;
  }

  return findUserError(rawMessage, map);
}
