const datasets = {}

datasets.lineal1 = {
    labels: ['opcion A', 'opcion B', 'opcion C'],
    datasets: [
        {
            label: 'Recuento de votos',
            data: [10, 20, 30],
            backgroundColor: [
                'rgba(255, 0, 0, 0.4)',/*
                'rgba(0, 255, 0, 0.4)',
                'rgba(0, 0, 255, 0.4)',*/
            ],
            borderColor: [
                'rgba(255, 100, 100)',/*
                'rgba(100, 255, 100)',
                'rgba(100, 100, 255)',*/
            ],
            borderWidth: 3
        }
    ]
}

datasets.lineal2 = {
    labels: ['ciudad A', 'ciudad B', 'ciudad C', 'ciudad D'],
    datasets: [
        {
            label: 'Recuento de votos a favor',
            data: [10, 20, 30, 40],
            backgroundColor: [
                'rgba(255, 0, 0, 0.4)',
            ],
            borderColor: [
                'rgba(255, 100, 100)',
            ],
            borderWidth: 3
        },
        {
            label: 'Recuento de votos en contra',
            data: [20, 10, 7, 22],
            backgroundColor: [
                'rgba(0, 255, 0, 0.4)',
            ],
            borderColor: [
                'rgba(100, 255, 100)',
            ],
            borderWidth: 3
        }
    ]
}

datasets.lineal3 = {
    labels: ['opcion A', 'opcion B', 'opcion C'],
    datasets: [{
        label: 'Recuento de votos',
        data: [10, 20, 30],
        backgroundColor: [
            'rgba(255, 100, 100, 0.5)',
            'rgba(100, 255, 100, 0.5)',
            'rgba(0, 255, 255, 0.5)',
        ],
        borderColor: [
            'rgba(255, 100, 100)',
            'rgba(100, 255, 100)',
            'rgba(100, 255, 255)',
        ],
        borderWidth: 3
    }]
}
datasets.lineal4 = {
    labels: ['opcion A', 'opcion B', 'opcion C', 'opcion D', 'opcion E'],
    datasets: [{
        label: 'Recuento de votos',
        data: [10, 20, 30, 25, 15],
        backgroundColor: [
            'rgba(255, 100, 100, 0.4)',
            'rgba(255, 255, 100, 0.4)',
            'rgba(100, 255, 100, 0.4)',
            'rgba(0, 255, 255, 0.4)',
            'rgba(255, 0, 255, 0.4)',
        ],
        borderColor: [
            'rgba(255, 100, 100)',
            'rgba(255, 255, 100)',
            'rgba(100, 255, 100)',
            'rgba(0, 255, 255)',
            'rgba(255, 0, 255)',
        ],
        borderWidth: 3
    }]
}

datasets.lineal5 = {
    labels: ['opcion A', 'opcion B', 'opcion C', 'opcion D', 'opcion E'],
    datasets: [{
        label: 'Recuento de votos',
        data: [10, 20, 30, 25, 15],
        fill: true,
        backgroundColor: [
            'rgba(0, 255, 255, 0.4)',
        ],
        borderColor: 'rgba(0, 255, 255)',
        borderWidth: 3
    }]
}

export default datasets