import { useRouter } from 'next/router'

import { 
  Navbar, Container, Nav 
} from 'react-bootstrap'

function Header() {
	const router = useRouter(); 

  function redirectPage(link){
    router.push(link);
  }
  
  return (
		<div>
			<Navbar variant="light" className='customNavbar'>
        <Container>
          <Navbar.Brand onClick={ ()=>redirectPage("/") }>
            Polygon
          </Navbar.Brand>
          <Nav>
            <Nav.Link onClick={ ()=>redirectPage("/") } className='customNavlink'>Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
		</div>
	)
}

export default Header;

