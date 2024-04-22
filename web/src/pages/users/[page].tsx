import Head from 'next/head'
import { Inter } from 'next/font/google'
import Table from 'react-bootstrap/Table'
import { Alert, Container } from 'react-bootstrap'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useState } from 'react'
import { v4 } from 'uuid'
const inter = Inter({ subsets: ['latin'] })
type TUserItem = {
	id: number
	firstname: string
	lastname: string
	email: string
	phone: string
	updatedAt: string
}

export const getStaticProps = (async (
	context: GetStaticPropsContext
) => {
	const page = context?.params?.page ?? 1
		try {
			const res = await fetch(`http://localhost:3000/users/${(+page - 1) * 20 + 1}`, {
				method: 'GET',
			})
			if (!res.ok) {
				return { props: { statusCode: res.status, users: [] } }
			}
			
			return {
				
				props: { statusCode: 200, users: await res.json() },
			}
		} catch (e) {
			return { props: { statusCode: 500, users: [] } }
		}
}) 

export const getStaticPaths = (async () => {
	const paths = []
	for(let i = 1; i < 251; i++){
		paths.push({
			params: { page: i.toString() },
		})
	}
	return {
		paths,
		fallback: false
	}
	
})

export default function Home({ statusCode, users }: any) {

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
					<h1 className={'mb-5'}>Пользователи</h1>

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
							{users.map((user: TUserItem) => (
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
