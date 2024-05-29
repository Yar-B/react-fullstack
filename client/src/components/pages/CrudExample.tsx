import { Form, Button, Input, Table, Modal } from 'antd';
import { ApiService } from '../../services/api.service';
import { useEffect, useState } from 'react';

const apiService = new ApiService();

const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Название',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Описание',
		dataIndex: 'description',
		key: 'description'
	}
];

function CrudExample(props: any) {
	const isUserAdmin = props.currentUserInfo.role === 'admin';

	const [items, setItems] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [itemRecord, setItemRecord] = useState<any>({});

	function showItem(recId?: number) {
		recId
			? apiService.get('/item/' + recId).then(res => {
					setItemRecord(res);
					setModalVisible(true);
			  })
			: setModalVisible(true);
	}

	function saveItem() {
		apiService.post('/item', itemRecord).then(() => {
			close();
			fetchData();
		});
	}

	function removeItem(recId: number) {
		apiService.delete('/item/' + recId).then(() => {
			close();
			fetchData();
		});
	}

	function close() {
		setItemRecord({});
		setModalVisible(false);
	}

	function fetchData() {
		apiService.get('/items').then(res => {
			setItems(res);
		});
	}

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			{isUserAdmin ? (
				<Button type='primary' onClick={() => showItem()}>
					Добавить
				</Button>
			) : (
				<></>
			)}
			<Table
				pagination={{ position: ['topRight'] }}
				dataSource={items}
				columns={columns}
				rowKey='id'
				onRow={(rec: any) => {
					return {
						onClick: () => showItem(rec.id)
					};
				}}
			></Table>
			<Modal
				title={itemRecord.id ? 'Изменение сущности с id=' + itemRecord.id : 'Добавление новой сущности'}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				footer={[
					isUserAdmin ? (
						<Button type='primary' onClick={() => saveItem()} disabled={!itemRecord.name || !itemRecord.description}>
							Сохранить
						</Button>
					) : null,
					isUserAdmin && itemRecord.id ? (
						<Button danger onClick={() => removeItem(itemRecord.id)}>
							Удалить
						</Button>
					) : null,
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='Название'>
						<Input
							disabled={!isUserAdmin}
							onChange={v =>
								setItemRecord((prevState: any) => {
									return { ...prevState, name: v.target.value };
								})
							}
							value={itemRecord.name}
						/>
					</Form.Item>
					<Form.Item label='Описание'>
						<Input
							disabled={!isUserAdmin}
							onChange={v =>
								setItemRecord((prevState: any) => {
									return { ...prevState, description: v.target.value };
								})
							}
							value={itemRecord.description}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default CrudExample;

