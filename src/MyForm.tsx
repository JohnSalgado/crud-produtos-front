import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { Button, Input, InputLabel } from '@material-ui/core';
import api from './services/api';

export default function MyForm() {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const addData = async () => {
    try {
      setLoading(true);
      await api.post('/produtos', formData);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <div>
      {loading && <span>carregando...</span>}
      {!loading && (
        <div>
          <div>
            <FormControl>
              <InputLabel>Produto</InputLabel>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel>Valor</InputLabel>
              <Input
                type="number"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel>Quantidade</InputLabel>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel>Descrição</InputLabel>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </FormControl>
          </div>
          <div>
            <Button onClick={() => addData()}>submit</Button>
          </div>
        </div>
      )}
    </div>
  );
}
