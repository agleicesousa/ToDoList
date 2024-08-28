// import React from 'react';

export default function ToDoList() {
    return (
        <div className='grid grid-rows-[150px_auto]'>
            <header className=''>
                Seção do Header
            </header>

            <main className='flex justify-evenly p-custom'>
                <section className='w-1/3 bg-[#FF6347] m-[20px]'>
                    Sessão 1
                </section>

                <section className='w-1/3 bg-[#FF6347] m-[20px]'>
                    Sessão 2
                </section>

                <section className='w-1/3 bg-[#FF6347] m-[20px]'>
                    Sessão 3
                </section>
            </main>

            <footer className=''>
                Isto é o fim
            </footer>
        </div>
    );
}