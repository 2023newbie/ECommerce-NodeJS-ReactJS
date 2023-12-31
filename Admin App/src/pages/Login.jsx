import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import url from '../utils/url'
import styled from 'styled-components'
import LoadingIcon from '../components/LoadingIcon'

const Container = styled.div`
  margin: auto;
  max-width: max-content;
  min-width: 500px;
  display: flex;
  justify-content: center;
  label {
    display: inline-block;
    min-width: 100px;
  }
  .button button {
    margin-top: 16px;
    padding: 8px 16px;
  }
`

const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Login = () => {
  const data = useActionData()
  const { state } = useNavigation()
  const isSubmitting = state === 'submitting'

  return (
    <>
      {isSubmitting && <Overlay>{<LoadingIcon />}</Overlay>}
      <Container>
        <Form method="post">
          <h1>Login</h1>
          {data?.msg && <div style={{ color: 'red' }}>{data.msg}</div>}
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="button">
            <button>Login</button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default Login

export async function action({ request }) {
  try {
    const data = await request.formData()
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    const res = await fetch(url.root + '/admin/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (res.status === 401) {
      return { msg: 'Unauthorized.' }
    }

    const resData = await res.json()
    document.cookie = 'TokenAdmin=' + resData.token + ';max-age=' + 60 * 60
    return redirect('/')
  } catch (err) {
    console.log(err)
  }
}
