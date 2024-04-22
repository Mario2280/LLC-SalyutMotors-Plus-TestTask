import Head from 'next/head'
import { Inter } from 'next/font/google'
import Table from 'react-bootstrap/Table'
import { Alert, Container } from 'react-bootstrap'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
const inter = Inter({ subsets: ['latin'] })

type TUserItem = {
	id: number
	firstname: string
	lastname: string
	email: string
	phone: string
	updatedAt: string
}

type TGetServerSideProps = {
	statusCode: number
	users: TUserItem[]
}


export const getServerSideProps = (async (
	ctx: GetServerSidePropsContext
): Promise<{ props: TGetServerSideProps }> => {
	try {
		const res = await fetch('http://localhost:3000/users', { method: 'GET' })
		if (!res.ok) {
			return { props: { statusCode: res.status, users: [] } }
		}

		return {
			props: { statusCode: 200, users: await res.json() },
		}
	} catch (e) {
		return { props: { statusCode: 500, users: [] } }
	}
}) satisfies GetServerSideProps<TGetServerSideProps>

export default function Home({ statusCode, users }: TGetServerSideProps) {
	
	if (statusCode !== 200) {
		return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>
	}
	
	return (
		<>
			<Head>
				<title>Тестовое задание</title>
				<meta name="description" content="Тестовое задание" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			

			<main className={inter.className}>
				<Container>
					

					<Table striped bordered hover>
						<thead>
							<tr>
								<th>ID</th>
								<th>Имя</th>
								<th>Фамилия</th>
								<th>Телефон</th>
								<th>Email</th>
								<th>Дата обновления</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.firstname}</td>
									<td>{user.lastname}</td>
									<td>{user.phone}</td>
									<td>{user.email}</td>
									<td>{user.updatedAt}</td>
								</tr>
							))}
						</tbody>
					</Table>

					{/*TODO add pagination*/}
				</Container>
			</main>
		</>
	)
}

