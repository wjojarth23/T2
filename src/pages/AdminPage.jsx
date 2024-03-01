import React from 'react'
import { Button, TextInput, Label} from 'flowbite-react'
import {useForm} from 'react-hook-form'
import {useCreateCollection, useListCollections, useRemoveCollection, useCountRecords} from '..//hooks/database'

export function AdminPage() {
  const {register, handleSubmit, getValues, reset} = useForm();
  const collections = useListCollections();
  const create = useCreateCollection();
  const remove = useRemoveCollection();
  
  function handleCreate() {
    create.mutate(getValues('name'));
    reset();
  }
  
  function handleRemove() {
    remove.mutate(getValues('name'));
    reset();
  }
  return (
    <div className='grid gap-4 justify-center'>
      <div className='text-2xl font-medium text-center my-3'>Admin Page</div>
      <form onSubmit={handleSubmit(handleCreate)} >
        <div>Creates a permissionless collection with a 'document' field for unstructered data.</div>
        <div  className='flex gap-2'>
          <TextInput type='text' placeholder='Type Name' {...register('name')}/>
          <Button onClick={handleCreate} isProcessing={create.isLoading}
            disabled={create.isLoading}>Create Collection</Button>
          <Button onClick={handleRemove} isProcessing={remove.isLoading} 
            disabled={remove.isLoading}>Remove Collection</Button>
        </div>
        
      </form>
      
      {collections.data && <CollectionsList data={collections.data}/>}
    </div>
  )
}


function CollectionsList({data}) {
  function createItem(item, key) {
    return <CollectionItem key={key} item={item}/>
  }
  return(
    <div className='grid gap-2'>
      <div className='text-lg font-medium'>Collections in Database</div>
      <ul className='list-disc mx-4 flex flex-col gap-5'>
        {data.map(createItem)}
      </ul>
    </div>
  )
}

function CollectionItem({item}) {
  console.log(item)
  const count = useCountRecords(item.name) 
  return (
    <li className='flex gap-4'>
      <div className='w-40'>
        <div className='text-xl font-bold text-cyan-800'>{item.name}</div>
        <Field name='total items' detail={count}/>
        <Field name='type' detail={item.type}/>
      </div>
      <ul className='w-40 flex flex-col gap-1'>
        <div className='font-bold'>Fields</div>
        <Field name='id' detail='🔑'/>
        {item.type == 'auth' && <Field name='username' detail='text'/>}
        {item.type == 'auth' && <Field name='email' detail='text'/>}
        {item.schema.map(i=><Field name={i.name} detail={i.type}/>)}
      </ul>
      <ul className='flex flex-col gap-1'>
        <div className='font-bold'>API Rules</div>
        <Field name='listRule' detail={item.listRule}/>
        <Field name='viewRule' detail={item.viewRule}/>
        <Field name='createRule' detail={item.createRule}/>
        <Field name='updateRule' detail={item.updateRule}/>
        <Field name='deleteRule' detail={item.deleteRule}/>
      </ul>
    </li>   
  )
}

function Field({name, detail}) {
  return(
    <li className='flex'>
      {name}:
      <div className='px-2 ms-3 border-2 rounded-lg'>
        {detail}
      </div>
    </li> 
  ) 
}
