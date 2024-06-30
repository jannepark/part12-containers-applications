import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from './Todo'

test('Todo component renders not done todo', () => {
    const NotDoneTodo = {
    text: 'Test not done todo',
    done: false
    }

    const mockHandler = jest.fn()

    // Not done Todo
    render(<Todo todo={NotDoneTodo} onClickDelete={mockHandler} onClickComplete={mockHandler} />)
    const notDoneTodoText = screen.getByText('Test not done todo')
    expect(notDoneTodoText).toBeInTheDocument()
    const notDoneTodoStatus = screen.getByText('This todo is not done')
    expect(notDoneTodoStatus).toBeInTheDocument()
    const notDoneTodoDeleteButton = screen.getByText('Delete')
    expect(notDoneTodoDeleteButton).toBeInTheDocument()
    const notDoneTodoCompleteButton = screen.getByText('Set as done')
    expect(notDoneTodoCompleteButton).toBeInTheDocument()

})
test('Todo component renders done todo', () => {
    const DoneTodo = {
        text: 'Test done todo',
        done: true
    }
    
    const mockHandler = jest.fn()
    
    render(<Todo todo={DoneTodo} onClickDelete={mockHandler} onClickComplete={mockHandler} />)
    const doneText = screen.getByText('Test done todo')
    expect(doneText).toBeInTheDocument()
    const doneStatus = screen.getByText('This todo is done')
    expect(doneStatus).toBeInTheDocument()
    const doneDeleteButton = screen.getByText('Delete')
    expect(doneDeleteButton).toBeInTheDocument()
    const doneCompleteButton = screen.queryByText('Set as done')
    expect(doneCompleteButton).not.toBeInTheDocument()
    })
